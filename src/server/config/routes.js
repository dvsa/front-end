import { Router } from 'express';

import * as mainController from './../controllers/main.controller';
import * as miscController from './../controllers/misc.controller';
// import * as libraryController from './../controllers/library.controller';

const router = Router();

// Misc routes
router.get('/robots.txt', mainController.robots);
router.get('/', mainController.index);

// Library routes
// router.get('/library/*', libraryController.allViews);

// Create route from view path
router.get('*', miscController.viewFileRoute);

export const allRoutes = router;
