import logger from "./logger";
import {pushStateOnRoute} from "./route";
import {getPageOnRoute, sendPageDiff, unsetEditLineOnRoute} from "./page";
import {getPageListOnRoute} from "./pagelist";

export default [ pushStateOnRoute, unsetEditLineOnRoute, getPageOnRoute, getPageListOnRoute, sendPageDiff, logger ];
