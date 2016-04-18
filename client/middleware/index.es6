import logger from "./logger";
import {pushStateOnRoute} from "./route";
import {getPageOnRoute, sendPageDiff} from "./page";
import {getPageListOnRoute} from "./pagelist";

export default [ pushStateOnRoute, getPageOnRoute, getPageListOnRoute, sendPageDiff, logger ];
