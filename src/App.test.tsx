import puppeteer, {Browser, BrowserConnectOptions, BrowserLaunchArgumentOptions, Page} from 'puppeteer'

// @ts-ignore
const isDebugMode = () => process.env.NODE_ENV === 'debug'

const getLaunchOption = (): BrowserLaunchArgumentOptions & BrowserConnectOptions => {
  if (isDebugMode()) {
    return {
      // 화면을 표시한다
      headless: false,
      // puppeteer의 동작 시간에 패널티를 준다(개발자가 시각적으로 확인할 틈을 주기 위함)
      // slowMo: 250,
      // 개발자 도구를 켠다
      devtools: true
    }
  }

  return {}
}

let browser: Browser
let page: Page

beforeAll(async () => {
  browser = await puppeteer.launch(getLaunchOption())
  page = await browser.newPage()
  await page.setViewport({
    width: 500,
    height: 2400
  })

  // 로컬호스트에 페이지를 요청한다
  await page.goto('http://localhost:3000')
})

afterAll(async () => {
  // 브라우저를 닫는다.
  await browser.close()
})

describe('페이지가 뜨면', () => {
  test('h1이 표시된다', async () => {
    // page.$eval 은 페이지 안의 요소를 평가한다. 동작이 거의 보이지 않는다
    const innerHTML = await page.$eval('.App-link', (element) => element.innerHTML)
    // 단정을 실행
    expect(innerHTML).toBe('Learn React')
    // 테스트 함수의 유지시간을 지정
  }, 16000)
})
