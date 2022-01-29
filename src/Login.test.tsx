import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {act, renderHook} from "@testing-library/react-hooks";
import {FormEvent} from "react";
import {formData2FormValues, LoginForm, useSubmit} from "./Login";
import faker from '@faker-js/faker'

const formValues = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

test('formData2FormValues() 는 폼 데이터에서 데이터를 출력한다', () => {
  const formData: FormData = new FormData()
  formData.set('firstName', formValues.firstName)
  formData.set('lastName', formValues.lastName)
  formData.set('email', formValues.email)
  formData.set('password', formValues.password)

  expect(formData2FormValues(formData)).toMatchObject(formValues)
})

describe('<LoginForm />', () => {
  test('firstName input', async () => {
    const onSubmit = jest.fn()
    const { queryByTestId } = render(<LoginForm onSubmit={onSubmit} />)
    const item = queryByTestId('firstName')

    expect(item).toBeVisible()

    userEvent.type(item as HTMLElement, `${formValues.firstName}{enter}`)
    expect(item).toHaveValue(formValues.firstName)

    expect(onSubmit).toBeCalledTimes(1)
  })

  test('lastName Input', async ()=> {
    const onSubmit = jest.fn()
    const { queryByTestId } = render(<LoginForm onSubmit={onSubmit} />)
    const item = queryByTestId('lastName')

    expect(item).toBeVisible()

    userEvent.type(item as HTMLElement, `${formValues.lastName}{enter}`)
    expect(item).toHaveValue(formValues.lastName)

    expect(onSubmit).toBeCalledTimes(1)
  })

  test('email Input', async ()=> {
    const onSubmit = jest.fn()
    const { queryByTestId } = render(<LoginForm onSubmit={onSubmit} />)
    const item = queryByTestId('email')

    expect(item).toBeVisible()

    userEvent.type(item as HTMLElement, `${formValues.email}{enter}`)
    expect(item).toHaveValue(formValues.email)

    expect(onSubmit).toBeCalledTimes(1)
  })

  test('password Input', async ()=> {
    const onSubmit = jest.fn()
    const { queryByTestId } = render(<LoginForm onSubmit={onSubmit} />)
    const item = queryByTestId('password')

    expect(item).toBeVisible()

    userEvent.type(item as HTMLElement, `${formValues.password}{enter}`)
    expect(item).toHaveValue(formValues.password)

    expect(onSubmit).toBeCalledTimes(1)
  })

  test('useSubmit() 함수는 폼 데이터를 값으로 정제하는 이벤트 핸들러를 반환한다', async () => {
    const { result } = renderHook(() => useSubmit())

    const onSubmit = jest.fn((e: FormEvent<HTMLFormElement>) => {
      return result.current(e)
    })

    const { queryByTestId } = render(<LoginForm onSubmit={onSubmit} />)

    const firstName = queryByTestId('firstName')
    userEvent.type(firstName as HTMLElement, formValues.firstName)
    const lastName = queryByTestId('lastName')
    userEvent.type(lastName as HTMLElement, formValues.lastName)
    const email = queryByTestId('email')
    userEvent.type(email as HTMLElement, formValues.email)
    const password = queryByTestId('password')
    userEvent.type(password as HTMLElement, `${formValues.password}{enter}`)

    expect(onSubmit).toHaveLastReturnedWith(formValues)
  })
})
