import {FC, FormEventHandler, useCallback} from "react";

const LoginPage: FC = ({children}) => {
  return <div className="login-page">
    <div className="form">{children}</div>
  </div>;
}

export const formData2FormValues = (formData: FormData) => {
  return Array.from(formData.keys()).reduce((sum, key) => {
    return {
      ...sum,
      [key]: formData.get(key)
    }
  }, {})
}

const SubmitButton: FC = () =>  <button data-testid="submit" type="submit">서브밋</button>

const ResetButton: FC = () =>  <button data-testid="reset"  type="reset">리셋</button>

export const LoginForm: FC<{ onSubmit: FormEventHandler<HTMLFormElement> }> = ({onSubmit}) => {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      <TextInput testid="firstName"/>
      <TextInput testid="lastName"/>
      <TextInput testid="email"/>
      <TextInput testid="password"/>
      <SubmitButton />
      <ResetButton />
    </form>
  )
}

const TextInput: FC<{ testid: string }> = ({testid}) => {
  return <input type="text" name={testid} data-testid={testid}/>
}

export const useSubmit = () => {
  return useCallback<FormEventHandler>((e) => {
    const formData = new FormData(e.target as HTMLFormElement)

    return formData2FormValues(formData)
  }, []);
}

export const Login: FC = () => {
  const onSubmit = useSubmit()

  return (
    <LoginPage>
      <LoginForm onSubmit={onSubmit} />
    </LoginPage>
  )
}
