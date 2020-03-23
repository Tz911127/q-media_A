
// 应用初始状态
const editor = {
  state: {
    pixelHorizontal: null,
    pixelVertical: null,
    size: null,
    pages: [],
    selectPage: null,
    selectPageIndex: 0,
    // fontSize: null,
    programSize: null,
    originalPixel: null,
    selectElements: [],
    stepper: '',
    // selectImgs: [],
    // selectMedias: [],
    programContent: null,
    editorProgram: false,
    editorProgramId: '',
    editorProgramName: '',
    // full: false,
    selectedIndex: 0,
    gridShow: false,
    autoAnchor: true
  },
  mutations: {
    //编辑器部分
    SET_PH: (state, pixelHorizontal) => {
      state.pixelHorizontal = Number(pixelHorizontal)
    },
    SET_PV: (state, pixelVertical) => {
      state.pixelVertical = Number(pixelVertical)
    },
    SET_SIZE: (state, size) => {
      state.size = size
    },
    PUSH_PAGES: (state, page) => {
      state.pages.push(page)
    },
    SET_PAGES:(state,pages)=>{
      state.pages = pages
    },
    DELETE_PAGE: (state, index) => {
      state.pages.splice(index, 1)
      if (index == 0) {
        state.selectPageIndex = 0
      } else {
        state.selectPageIndex = index - 1
      }
      state.selectPage = state.pages[state.selectPageIndex]
    },
    SELECT_PAGE: (state, page) => {
      state.selectPage = page
      state.selectElements = []
    },
    SELECT_PAGE_INDEX: (state, index) => {
      state.selectPageIndex = index
    },
    // SET_FONTSIZE: (state, fontSize) => {
    //   state.fontSize = fontSize
    // },
    SET_PROGRAMSIZE: (state, programSize) => {
      state.programSize = programSize
    },
    SET_ORIGINALPIXEL: (state, originalPixel) => {
      state.originalPixel = originalPixel
    },
    SELECT_ELEMENTS: (state, ele) => {
      state.selectElements.push(ele)
    },
    REMOVE_ELE: (state, ele) => {
      let index = state.selectElements.indexOf(ele)
      state.selectElements.splice(index, 1)
    },
    SET_STEPPER: (state, value) => {
      state.stepper = value
    },
    // SELECT_IMGS: (state, item) => {
    //   state.selectImgs.push(item)
    // },
    // DELECTED_IMG: (state, item) => {
    //   let index = state.selectImgs.indexOf(item)
    //   state.selectImgs.splice(index, 1)
    // },
    // CLEAR_SELECT_IMGS: (state) => {
    //   state.selectImgs = []
    // },
    // SELECT_MEDIAS: (state, item) => {
    //   state.selectMedias.push(item)
    // },
    // DELECTED_MEDIAS: (state, item) => {
    //   let index = state.selectMedias.indexOf(item)
    //   state.selectMedias.splice(index, 1)
    // },
    // CLEAR_SELECT_MEDIAS: (state) => {
    //   state.selectMedias = []
    // },
    CLEAR_SELECTELEMENTS: (state) => {
      state.selectElements = []
    },
    SET_PROGRAM_CONTENT: (state, obj) => {
      state.programContent = obj
    },
    CLEAR_PROGRAM_CONTENT: (state) => {
      state.programContent = null
    },
    EDITOR_PROGRAM: (state) => {
      state.editorProgram = true
    },
    EDITOR_PROGRAM_ID: (state, id) => {
      state.editorProgramId = id
    },
    EDITOR_PROGRAM_NAME: (state, name) => {
      state.editorProgramName = name
    },
    SET_FULL: (state, obj) => {
      state.full = obj
    },
    SELECTED_INDEX: (state, num) => {
      state.selectedIndex = num
    },
    SET_GRID_SHOW: (state, data) => {
      state.gridShow = data
    },
    SET_ADSORBENT_SHOW: (state, data) => {
      state.autoAnchor = data
    }
  },
  getters: {
    selectPageElements: state => {
      let arr = []
      if (state.selectPage) {
        let elements = state.selectPage.pages[0].elements
        for (let key in elements) {
          arr.push(elements[key])
        }
        state.selectPage.pages[0].elements = arr
      }
      return arr
    },
    pages: state => {
      return state.pages
    },
    pixelHorizontal: state => {
      return state.pixelHorizontal
    },
    pixelVertical: state => {
      return state.pixelVertical
    },
    size: state => {
      return state.size
    },
    selectPage: state => {
      return state.selectPage
    },
    selectPageIndex: state => {
      return state.selectPageIndex
    },
    programSize: state => {
      return state.programSize
    },
    originalPixel: state => {
      return state.originalPixel
    },
    selectElements: state => {
      return state.selectElements
    },
    stepper: state => {
      return state.stepper
    },
    programContent: state => {
      return state.programContent
    },
    editorProgram: state => {
      return state.editorProgram
    },
    editorProgramId: state => {
      return state.editorProgramId
    },
    editorProgramName: state => {
      return state.editorProgramName
    },
    selectedIndex: state => {
      return state.selectedIndex
    },
    gridShow: state => {
      return state.gridShow
    },
    autoAnchor: state => {
      return state.autoAnchor
    }
  },

}

export default editor