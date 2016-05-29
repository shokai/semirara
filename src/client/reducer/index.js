import {combineReducers} from "redux"
import page from "./page"
import pagelist from "./pagelist"
import socket from "./socket"

export default combineReducers({page, pagelist, socket})
