import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getPassword } from "./api/passwords";
import useAsync from "./hooks/useAsync";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const { data, loading, error, doFetch } = useAsync(() =>
    getPassword("banking")
  );

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    getPassword(data);
    console.log(getPassword(data));
  };

  console.log(watch("fetchPassword")); // watch input value by passing the name of it

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {loading && <div>Loading...</div>}
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* include validation with required or other standard HTML validation rules */}
          <input name="fetchPassword" ref={register({ required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.fetchPassword && <span>This field is required</span>}

          <input type="submit" />
        </form>
        );
      </header>
    </div>
  );
}

export default App;
