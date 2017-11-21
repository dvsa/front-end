import { Router } from 'express';

import * as mainController from './../controllers/main.controller';
import * as miscController from './../controllers/misc.controller';
import * as recallsController from './../controllers/api/v1/recalls.controller';
import * as prototypesController from './../controllers/prototypes.controller';
import * as templatesController from './../controllers/templates.controller';

const router = Router();

// Misc routes
router.get('/robots.txt', mainController.robots);
router.get('/', mainController.index);

// API Routes
router.post('/api/v1/recalls', recallsController.recalls);

router.get('/prototypes', prototypesController.indexGet);
router.get('/templates', templatesController.indexGet);
router.get('/templates/manuals', templatesController.manualsGet);
router.get('/templates/manuals-menu', templatesController.manualsMenuGet);
router.get('/templates/manuals-page', templatesController.manualsPageGet);

// Create route from view path
router.get('*', miscController.viewFileRoute);

export const allRoutes = router;
