import logger from "./logger";
import {pushStateOnRoute} from "./route";
import {getPageOnRoute, sendPage, unsetEditLineOnRoute, removeEmptyLines} from "./page";
import {getPageListOnRoute} from "./pagelist";

export default [ pushStateOnRoute, unsetEditLineOnRoute, getPageOnRoute, getPageListOnRoute, removeEmptyLines, sendPage, logger ];
