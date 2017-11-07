import express from 'express';

import MainController from './../controllers/main.controller';
import MothController from './../controllers/moth.controller';
import LibraryController from './../controllers/library.controller';
import ExampleController from './../controllers/example.controller';
import TestController from './../controllers/test.controller';

const router = express.Router();

/**
 * Main Routes
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
router.get('/robots.txt', MainController.robotsGet.bind(MainController));
router.get('/', MainController.indexGet.bind(MainController));

/**
 * MOTH Routes
 * 
 * Setup the routes for MOTH.
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
router.get('/moth', MothController.indexGet.bind(MothController));
router.post('/moth', MothController.indexPost.bind(MothController));

router.get('/moth/enter-reg', MothController.enterRegGet.bind(MothController));
router.post('/moth/enter-reg', MothController.enterRegPost.bind(MothController));

router.get('/moth/enter-reg-error', MothController.enterRegErrorGet.bind(MothController));
router.post('/moth/enter-reg-error', MothController.enterRegErrorPost.bind(MothController));

router.get('/moth/search-results', MothController.searchResultsGet.bind(MothController));
router.get('/moth/privacy-policy', MothController.privacyPolicyGet.bind(MothController));

/**
 * Library Routes
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
router.get('/library', LibraryController.indexGet.bind(LibraryController));
router.post('/library', LibraryController.indexPost.bind(LibraryController));

/**
 * Example Routes
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
router.get('/example', ExampleController.indexGet.bind(ExampleController));
router.post('/example', ExampleController.indexPost.bind(ExampleController));

router.get('/example/example-second', ExampleController.secondGet.bind(ExampleController));

/**
 * Test Routes
 * 
 * @author Tameem Safi <t.safi@kainos.com>
 * @since 1.0.0
 */
router.get('/test', TestController.indexGet.bind(TestController));
router.get('/code', TestController.codeDumpGet.bind(TestController));

export default router;
