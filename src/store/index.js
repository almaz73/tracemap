import Vuex from 'vuex';
import Vue from 'vue';
import * as axios from 'axios';
import decodePolyline from "../assets/js/decodePolyline";

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    state: {
      isMenu: false,
      alarms: [],
      editTools: [],
      editLayers: [],
      points: [],
      isShowTool: true,
      tools: [],
    },
    getters: {
      isMenu(state) {
        return state.isMenu;
      },
      alarms(state) {
        return state.alarms;
      },
      editTools(state) {
        return state.editTools;
      },
      editLayers(state) {
        return state.editLayers;
      },
      points(state) {
        return state.points;
      },
      isShowTool(state) {
        return state.isShowTool;
      },
      tools(state) {
        return state.tools
      }
    },
    mutations: {
      setIsMenu(state, isMenu) {
        state.isMenu = isMenu;
      },
      setAlarms(state, alarms) {
        state.alarms = alarms;
      },
      setEditTool(state, toolName) {
        let exist = state.editTools.indexOf(toolName);
        if (exist > -1) state.editTools.splice(exist, 1);
        else state.editTools.push(toolName)
      },
      setEditLayer(state, layerName) {
        let exist = state.editLayers.indexOf(layerName);
        if (exist > -1) state.editLayers.splice(exist, 1);
        else state.editLayers.push(layerName)
      },
      setPoints(state, points) {
        state.points = points;
      },
      setShowTool(state, bool) {
        state.isShowTool = bool
      },
      setTools(state, elem) {
        state.tools = [];
        if (elem.val) state.tools.push(elem);
        else {
          state.tools = state.tools.filter(el => {
            return el.tool !== elem.tool;
          })
        }
      }
    },
    actions: {
      setIsMenu(context, payload) {
        context.commit('setIsMenu', payload);
      },
      setAlarms(context, payload) {
        context.commit('setAlarms', payload);
      },
      setEditTool(context, toolName) {
        context.commit('setEditTool', toolName)
      },
      setEditLayer(context, layerName) {
        context.commit('setEditLayer', layerName)
      },
      setShowTool(context, bool) {
        context.commit('setShowTool', bool)
      },
      setTools(context, elem) {
        context.commit('setTools', elem);
      },
      async getAlarms(context) {
        const req = await axios.get('/ambulance/dictionaries/actions?codes=48');

        context.commit('setAlarms', req.data);
      },
      async getPoints(context) {
        const req = await axios.get('/ambulance/gis/route?fromLat=46.5234&fromLon=48.23&toLat=46.67211&toLon=48.24');
        let decode = decodePolyline(req.data[0].points);
        context.commit('setPoints', decode);
      }
    }
  });
};

export default createStore;
