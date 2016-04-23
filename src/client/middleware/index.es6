import logger from "./logger";
import {pushStateOnRoute} from "./route";
import {getPageOnRoute, sendPage, unsetEditLineOnRoute, removeEmptyLines, adjustEditLineOnPageLines} from "./page";
import {getPageListOnRoute} from "./pagelist";

export default [ pushStateOnRoute, unsetEditLineOnRoute, getPageOnRoute, getPageListOnRoute, removeEmptyLines, sendPage, adjustEditLineOnPageLines, logger ];
