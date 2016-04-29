import logger from "./logger";
import {validateOnRoute, pushStateOnRoute} from "./route";
import {getPageOnRoute, sendPage, unsetEditLineOnRoute, removeEmptyLines, adjustEditLineOnPageLines} from "./page";
import {getPageListOnRoute} from "./pagelist";
import {updateTitle} from "./document";

export default [ validateOnRoute, pushStateOnRoute, updateTitle, unsetEditLineOnRoute, getPageOnRoute, getPageListOnRoute,
                 removeEmptyLines, sendPage, adjustEditLineOnPageLines,
                 logger ];
