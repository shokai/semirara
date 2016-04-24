import logger from "./logger";
import {validateOnRoute, pushStateOnRoute} from "./route";
import {getPageOnRoute, sendPage, unsetEditLineOnRoute, removeEmptyLines, adjustEditLineOnPageLines} from "./page";
import {getPageListOnRoute} from "./pagelist";

export default [ validateOnRoute, pushStateOnRoute, unsetEditLineOnRoute, getPageOnRoute, getPageListOnRoute,
                 removeEmptyLines, sendPage, adjustEditLineOnPageLines, logger ];
