import {combineReducers} from "redux"
import page from "./page"
import pagelist from "./pagelist"
import relatedPagelist from './related-pagelist'
import socket from "./socket"

export default combineReducers({page, pagelist, relatedPagelist, socket})
