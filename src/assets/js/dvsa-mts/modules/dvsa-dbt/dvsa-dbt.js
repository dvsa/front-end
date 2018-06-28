import toString from 'lodash/toString';
import {
  addEventListenerToEl,
  toggleAttribute,
  toggleDisabledAttribute,
  selectOptionByValue,
  disabledSelectOptionByValue,
  toggleDisabledSelectOptionByValue,
  elHasClass,
  toggleClass,
} from './../../../shared';

export class DvsaDbt {
  constructor() {
    this.elements = {
      base: document.querySelector('.dvsa-dbt'),
      table: document.querySelector('.dvsa-dbt__table'),
      tableRows: Array.from(document.querySelectorAll('.dvsa-dbt__table-row')),
      totalScore: document.querySelector('.dvsa-dbt__total-score'),
      caseOutcomeSelect: document.querySelector('#caseOutcome'),
      differencesForm: document.querySelector('#differences-form'),
    };

    this.classnames = {
      vehicleExaminerRow: 'vehicle-examiner-row',
      testerRow: 'tester-row',
      formControlError: 'form-control-error',
    };

    this.selectors = {
      pointScore: '.point-score',
      defectsDecision: '.defects-decisions',
      categories: '.categories',
      justification: '.justification',
    };

    this.attributes = {
      rowStateIndex: 'data-row-state-index',
      value: 'data-value',
    };

    this.data = {
      pointScore: {
        pleaseSelect: '',
        disregard: '1',
        noDefect: '5',
        noOtherDefectMissed: '6',
        incorrectDecision: '3',
      },
      defectsDecision: {
        pleaseSelect: '',
        notApplicable: '1',
        defectMissed: '2',
        incorrectDecision: '3',
      },
      categories: {
        pleaseSelect: '',
        notApplicable: '1',
      },
      caseOutcomes: {
        noFutherAction: '1',
        advisoryWarningLetter: '2',
        disciplinaryActionReport: '3',
      },
    };

    this.state = {
      totalScore: 0,
      rows: [],
    };

    if (!this.elements.base || !this.elements.table || !this.elements.tableRows.length || !this.elements.totalScore) return;

    this.init();
  }

  /**
   * Initializer
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  init = () => {
    this.setupTableRows();
    this.updateRowValues();
    this.update();

    addEventListenerToEl(this.elements.differencesForm, 'submit', this.onDifferencesFormSubmit);
  };

  /**
   * Setup the table rows
   *
   * - Add event listeners
   * - Add elements to state
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  setupTableRows = () => {
    this.elements.tableRows.forEach(element => {
      const pointScore = element.querySelector(this.selectors.pointScore);
      const defectsDecision = element.querySelector(this.selectors.defectsDecision);
      const categories = element.querySelector(this.selectors.categories);
      const justification = element.querySelector(this.selectors.justification);
      const isVehicleExaminerRow = elHasClass(element, this.classnames.vehicleExaminerRow);
      const isTesterRow = elHasClass(element, this.classnames.testerRow);

      addEventListenerToEl(pointScore, 'change', this.update);
      addEventListenerToEl(defectsDecision, 'change', this.update);
      addEventListenerToEl(categories, 'change', this.update);

      addEventListenerToEl(pointScore, 'change', this.removeFormControlErrorClass);
      addEventListenerToEl(defectsDecision, 'change', this.removeFormControlErrorClass);
      addEventListenerToEl(categories, 'change', this.removeFormControlErrorClass);
      addEventListenerToEl(justification, 'change', this.removeFormControlErrorClass);
      addEventListenerToEl(justification, 'input', this.removeFormControlErrorClass);
      addEventListenerToEl(justification, 'paste', this.removeFormControlErrorClass);

      if (isVehicleExaminerRow) {
        toggleDisabledSelectOptionByValue(pointScore, this.data.pointScore.noDefect, true);
        toggleDisabledSelectOptionByValue(defectsDecision, this.data.defectsDecision.notApplicable, true);
        toggleDisabledSelectOptionByValue(categories, this.data.categories.notApplicable, true);
      }

      if (isTesterRow) {
        toggleDisabledSelectOptionByValue(pointScore, this.data.pointScore.noOtherDefectMissed, true);
        toggleDisabledSelectOptionByValue(defectsDecision, this.data.defectsDecision.defectMissed, true);
      }

      this.state.rows.push({
        pointScore,
        defectsDecision,
        categories,
        justification,
        isVehicleExaminerRow,
        isTesterRow,
        values: null,
      });

      toggleAttribute(element, this.attributes.rowStateIndex, this.state.rows.length - 1, true);
    });
  };

  /**
   * Updates the state with row values
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  updateRowValues = () => {
    this.state.rows.forEach((row, index) => {
      const currentValues = row.values && row.values.current ? row.values.current : null;
      this.state.rows[index].values = {
        previous: {
          pointScore: currentValues && currentValues.pointScore ? currentValues.pointScore : null,
          defectsDecision: currentValues && currentValues.defectsDecision ? currentValues.defectsDecision : null,
          categories: currentValues && currentValues.categories ? currentValues.categories : null,
        },
        current: {
          pointScore: toString(row.pointScore.value),
          defectsDecision: toString(row.defectsDecision.value),
          categories: toString(row.categories.value),
        },
      };
    });
  };

  /**
   * Update DOM/State
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  update = () => {
    this.updateRowValues();

    this.state.rows.forEach(row => {
      this.checkPointScoreSelectValue(row);
      this.checkDefectSelectValue(row);
    });

    this.updateRowValues();
    this.updateScore();
    this.updateCaseOutcome();
  };

  /**
   * Differences form submit handler
   *
   * @param {Event} event DOM Event object
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  onDifferencesFormSubmit = event => {
    event.preventDefault();
    this.state.rows.forEach(row => {
      this.enableSelectAndAllOptions(row.pointScore);
      this.enableSelectAndAllOptions(row.defectsDecision);
      this.enableSelectAndAllOptions(row.categories);
    });
    this.elements.differencesForm.submit();
  };

  enableSelectAndAllOptions = element => {
    if (!element) return;
    const options = Array.from(element.querySelectorAll('option'));
    if (!options || !options.length) return;
    options.forEach(option => {
      toggleDisabledAttribute(option, false);
    });
    toggleDisabledAttribute(element, false);
  };

  /**
   * Remove form control error class from element
   *
   * @param {Event} event DOM Event object
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  removeFormControlErrorClass = event => {
    if (!event || !event.currentTarget) return;
    toggleClass(event.currentTarget, this.classnames.formControlError, false);
  };

  /**
   * Check the defect decision select value and make relevant updates
   *
   * @param {Object} row State row object
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  checkDefectSelectValue = row => {
    if (!row || !row.values || row.values.current.defectsDecision === row.values.previous.defectsDecision) return;

    switch (row.values.current.defectsDecision) {
      case this.data.defectsDecision.pleaseSelect: {
        selectOptionByValue(row.categories, this.data.defectsDecision.pleaseSelect);
        break;
      }

      case this.data.defectsDecision.notApplicable: {
        if (row.isTesterRow) {
          selectOptionByValue(row.categories, this.data.categories.notApplicable);
        }

        if (row.isVehicleExaminerRow) {
          selectOptionByValue(row.categories, this.data.categories.pleaseSelect);
        }
        break;
      }

      case this.data.defectsDecision.incorrectDecision: {
        if (row.isTesterRow && row.values.current.pointScore === this.data.pointScore.noDefect) {
          selectOptionByValue(row.categories, this.data.categories.notApplicable);
          toggleDisabledAttribute(row.categories, true);
        }
        break;
      }

      default: {
        return;
      }
    }
  };

  /**
   * Check the point score select value and make relevant updates
   *
   * @param {Object} row State row object
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  checkPointScoreSelectValue = row => {
    if (!row || !row.values) return;
    if (row.values.current.pointScore === this.data.pointScore.disregard) {
      toggleDisabledAttribute(row.defectsDecision, true);
      toggleDisabledAttribute(row.categories, true);

      selectOptionByValue(row.defectsDecision, this.data.defectsDecision.notApplicable);
      selectOptionByValue(row.categories, this.data.categories.notApplicable);
    } else {
      toggleDisabledAttribute(row.defectsDecision, false);
      toggleDisabledAttribute(row.categories, false);

      if (row.values.current.pointScore === this.data.pointScore.noDefect) {
        if (row.values.previous.pointScore !== this.data.pointScore.noDefect) {
          selectOptionByValue(row.defectsDecision, this.data.defectsDecision.pleaseSelect);
          selectOptionByValue(row.categories, this.data.categories.pleaseSelect);
        }
      } else {
        if (row.values.current.pointScore !== row.values.previous.pointScore) {
          if (row.isVehicleExaminerRow) {
            selectOptionByValue(row.defectsDecision, this.data.defectsDecision.pleaseSelect);
            selectOptionByValue(row.categories, this.data.categories.pleaseSelect);
          }

          if (row.isTesterRow) {
            selectOptionByValue(row.defectsDecision, this.data.pointScore.incorrectDecision);
            selectOptionByValue(row.categories, this.data.categories.pleaseSelect);
          }
        }
      }
    }
  };

  /**
   * Update DOM element score text
   *
   * @param {Int} score Score value to use
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  updateScore = score => {
    let totalScore = 0;

    this.state.rows.forEach(row => {
      const score = this.getScoreForRow(row);
      totalScore += score ? parseInt(score) : 0;
    });

    this.state.totalScore = totalScore;
    this.elements.totalScore.textContent = this.state.totalScore;
  };

  /**
   * Update the case outcome select based on total score
   *
   * 0 - 9      - No further action
   * 10 - 29    - Advisory warning letter
   * 30+        - Disciplinary Action Report
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  updateCaseOutcome = () => {
    if (this.state.totalScore <= 9) {
      selectOptionByValue(this.elements.caseOutcomeSelect, this.data.caseOutcomes.noFutherAction);
      return;
    }

    if (this.state.totalScore <= 29) {
      selectOptionByValue(this.elements.caseOutcomeSelect, this.data.caseOutcomes.advisoryWarningLetter);
      return;
    }

    if (this.state.totalScore >= 30) {
      selectOptionByValue(this.elements.caseOutcomeSelect, this.data.caseOutcomes.disciplinaryActionReport);
      return;
    }
  };

  /**
   * Get score value of current row
   *
   * @param {Object} row State row object
   *
   * @author Tameem Safi <t.safi@kainos.com>
   */
  getScoreForRow = row => {
    if (!row) {
      return false;
    }

    const score = row.pointScore.value;
    const selectedOption = row.pointScore.querySelector(`option[value="${score}"]`);
    const scoreValue = selectedOption.getAttribute(this.attributes.value);

    if (!scoreValue) {
      return false;
    }

    return scoreValue;
  };
}
