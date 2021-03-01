import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSucess }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    try {
      const res = await axios[method](url, body);
      if (onSucess) {
        onSucess(res.data);
      }
      return res.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops!</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};

export default useRequest;
