import logger from "./logger";
import {validateOnRoute, pushStateOnRoute} from "./route";
import {getPageOnRoute, sendPage, unsetEditLineOnRoute, removeEmptyLines, adjustEditLineOnPageLines} from "./page";
import {getPageListOnRoute} from "./pagelist";
import {onPageTitleSubmit, cancelTitleEditOnRoute} from "./title";
import {stopEditOnSocketDisconnect} from "./socket-connection";
import {updateTitle} from "./document";

export default [ validateOnRoute, pushStateOnRoute, updateTitle, unsetEditLineOnRoute, getPageOnRoute, getPageListOnRoute,
                 removeEmptyLines, sendPage, adjustEditLineOnPageLines,
                 onPageTitleSubmit, cancelTitleEditOnRoute,
                 stopEditOnSocketDisconnect,
                 logger ];
