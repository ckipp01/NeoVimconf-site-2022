import { ReactNode, MouseEvent } from 'react';
import NavbarLayout from 'components/NavbarLayout';
import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import userbase from 'userbase-js';
import RegistrationSuccessMsg from 'components/RegistrationSuccessMsg';
import RegistrationErrorMsg from 'components/RegistrationErrorMsg';

const USERBASE_APP_ID = process.env.NEXT_PUBLIC_USERBASE_APP_ID;

function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [ success, setSuccess ] = useState(false);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    if (USERBASE_APP_ID) {
      userbase.init({ appId: USERBASE_APP_ID });
    }
  }, []);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const handleSubmitRegistration = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      try {
        await userbase.signUp({
          email,
          username: email,
          password: 'vimconf2',
          rememberMe: 'none',
        });
        setSuccess(true);
      } catch (err) {
        setError(true);
      }
    },
    [email]
  );

  if (success) {
    return <RegistrationSuccessMsg />;
  }

  if (error) {
    return <RegistrationErrorMsg />
  }

  return (
    <div
      className={`container m-4 mx-auto flex min-h-screen
      items-center justify-center 
    `}
    >
      <form className="flex w-96 flex-col gap-4">
        <label className="text-sm text-gray-300">Register to speak</label>
        <input
          className="rounded-sm p-2 text-gray-800"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <button
          type="submit"
          className={`rounded bg-green-500 px-4 py-2 text-blue-900 shadow transition 
            hover:bg-green-600`}
          onClick={handleSubmitRegistration}
        >
          Register
        </button>
      </form>
    </div>
  );
}

RegistrationPage.getLayout = (page: ReactNode) => {
  return <NavbarLayout>{page}</NavbarLayout>;
};

export default RegistrationPage;