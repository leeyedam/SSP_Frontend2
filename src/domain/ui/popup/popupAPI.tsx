import DefaultPopup from 'components/popup/DefaultPopup'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'src/store/store'
import { PopupObj, PopupProps } from 'types/popup'
import { v4 as uuidv4 } from 'uuid'

export interface PopupAPIInterface {
    show: (props: PopupProps) => void
    closeTopPopup: () => void
    closeAllPopup: () => void
    allowScrolling: () => void
    disallowScrolling: () => void
}

export class PopupAPI implements PopupAPIInterface {
    popupStack: PopupObj[]

    constructor() {
        this.popupStack = []
    }

    show(props: PopupProps) {
        const id = uuidv4()

        const popupObj = {
            id,
            props,
        }

        this.popupStack.push(popupObj)

        const rootEl = document.getElementById('root')
        const popupEl = document.createElement('div')

        popupEl.id = id
        popupEl.classList.add('popup')

        this.allowScrolling()

        rootEl.append(popupEl)
        ReactDOM.render(
            <Provider store={store}>
                <DefaultPopup
                    content={props.content}
                    type={props?.type}
                    buttons={props?.buttons}
                />
            </Provider>,
            popupEl
        )
    }

    closeTopPopup() {
        if (this.popupStack.length === 0) return
        const { id } = this.popupStack.pop()
        const popupEl = document.getElementById(id)

        ReactDOM.unmountComponentAtNode(popupEl)
        popupEl.remove()

        if (this.popupStack.length === 0) {
            // 팝업이 모두 닫혔을 때 스크롤 허용
            this.disallowScrolling()
        }
    }

    closeAllPopup() {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.popupStack.length; i++) {
            this.closeTopPopup()
        }
    }

    allowScrolling() {
        const bodyEl = window.document.body
        bodyEl.classList.add('noScroll')
    }

    disallowScrolling() {
        const bodyEl = window.document.body
        bodyEl.classList.remove('noScroll')
    }
}
