import toString from 'lodash/toString';
import {
  addEventListenerToEl,
  toggleAttribute,
  toggleDisabledAttribute,
  selectOptionByValue,
  disabledSelectOptionByValue,
  toggleDisabledSelectOptionByValue,
  elHasClass
} from './../../../shared';

export class DvsaDbt {
  constructor() {
    this.elements = {
      base: document.querySelector('.dvsa-dbt'),
      table: document.querySelector('.dvsa-dbt__table'),
      tableRows: Array.from(document.querySelectorAll('.dvsa-dbt__table-row')),
      totalScore: document.querySelector('.dvsa-dbt__total-score'),
    };

    this.classnames = {
      vehicleExaminerRow: 'vehicle-examiner-row',
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
        disregard: '1',
      },
      defectsDecision: {
        notApplicable: '1',
        incorrectDecision: '3',
      },
      categories: {
        notApplicable: '1',
      }
    };

    this.state = {
      totalScore: 0,
      rows: [],
    };

    if(
      !this.elements.base ||
      !this.elements.table ||
      !this.elements.tableRows ||
      !this.elements.totalScore
    ) return;

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
  }

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

      addEventListenerToEl(pointScore, 'change', this.update);
      addEventListenerToEl(defectsDecision, 'change', this.update);
      addEventListenerToEl(categories, 'change', this.update);
      
      this.state.rows.push({
        pointScore,
        defectsDecision,
        categories,
        justification,
        isVehicleExaminerRow,
        values: null,
      });
      
      toggleAttribute(element, this.attributes.rowStateIndex, this.state.rows.length - 1, true);
    });
  }

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
          pointScore: (currentValues && currentValues.pointScore) ? currentValues.pointScore : null,
          defectsDecision: (currentValues && currentValues.defectsDecision) ? currentValues.defectsDecision : null,
          categories: (currentValues && currentValues.categories) ? currentValues.categories : null,
        },
        current: {
          pointScore: toString(row.pointScore.value),
          defectsDecision: toString(row.defectsDecision.value),
          categories: toString(row.categories.value),
        }
      };
    });
  }

  /**
   * Update DOM/State
   * 
   * @author Tameem Safi <t.safi@kainos.com>
   */
  update = () => {
    this.updateRowValues();

    this.state.rows.forEach(row => {
      const score = this.getScoreForRow(row);

      if(row.values.current.pointScore === this.data.pointScore.disregard) {
        toggleDisabledAttribute(row.defectsDecision, true);
        toggleDisabledAttribute(row.categories, true);

        selectOptionByValue(row.defectsDecision, this.data.defectsDecision.notApplicable);
        selectOptionByValue(row.categories, this.data.categories.notApplicable);
      } else {
        toggleDisabledAttribute(row.defectsDecision, false);
        toggleDisabledAttribute(row.categories, false);

        console.log(row.isVehicleExaminerRow);
        
        toggleDisabledSelectOptionByValue(row.defectsDecision, this.data.defectsDecision.notApplicable, row.isVehicleExaminerRow);
        toggleDisabledSelectOptionByValue(row.categories, this.data.defectsDecision.notApplicable, row.isVehicleExaminerRow);
        
        if(row.isVehicleExaminerRow) {
          selectOptionByValue(row.defectsDecision, '');
          selectOptionByValue(row.categories, '');
        } else {
          selectOptionByValue(row.defectsDecision, this.data.defectsDecision.notApplicable);
          selectOptionByValue(row.categories, this.data.categories.notApplicable);
        }
      }
    });

    this.updateScore();
  }

  /**
   * Update DOM element score text
   * 
   * @param {Int} score Score value to use
   * 
   * @author Tameem Safi <t.safi@kainos.com>
   */
  updateScore = (score) => {
    let totalScore = 0;

    this.state.rows.forEach(row => {
      const score = this.getScoreForRow(row);
      totalScore += score ? parseInt(score) : 0;
    });

    this.state.totalScore = totalScore;
    this.elements.totalScore.textContent = this.state.totalScore;
  }

  /**
   * Get score value of current row
   * 
   * @param {Object} row State row object
   * 
   * @author Tameem Safi <t.safi@kainos.com>
   */
  getScoreForRow = (row) => {
    if(!row) {
      return false;
    }

    const score = row.pointScore.value;
    const selectedOption = row.pointScore.querySelector(`option[value="${score}"]`);
    const scoreValue = selectedOption.getAttribute(this.attributes.value);
    
    if(!scoreValue) {
      return false;
    }

    return scoreValue;
  }
}