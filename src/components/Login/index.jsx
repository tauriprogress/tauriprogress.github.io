import React, { useEffect } from "react";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { userErrorSelector } from "../../redux/selectors";
import { userLogin } from "../../redux/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ErrorMessage from "../ErrorMessage";

function Login({ location }) {
    const code = queryString.parse(location.search).code;
    const error = useSelector(userErrorSelector);
    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            userLogin({
                code: code,
                history: history,
            })
        );
    }, [dispatch]);

    return (
        <section>
            <p>Logging in...</p>
            {error && <ErrorMessage message={error} />}
        </section>
    );
}

export default Login;
