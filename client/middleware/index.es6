import logger from "./logger";
import {pushStateOnRoute} from "./route";
import {getPageOnRoute, sendPageDiff} from "./page";

export default [ pushStateOnRoute, getPageOnRoute, sendPageDiff, logger ];
