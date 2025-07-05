import httpInstance from "../../shared/services/http.instance.js";

/**
 * Service class for authentication.
 * @summary
 * This class contains methods for signing in and signing up.
 */
export class AuthenticationService {
    /**
     * Sign in method.
     * @param signInRequest {@link SignInRequest} - The sign in request.
     * @returns {Promise<http.AxiosResponse<SignInResponse>>}
     */
    signIn(signInRequest) {
        return httpInstance.post("/authentication/sign-in", signInRequest);
    }

    /**
     * Sign up method.
     * @param signUpRequest
     * @returns {Promise<http.AxiosResponse<SignUpResponse>>}
     */
    signUp(signUpRequest) {
        return httpInstance.post("/authentication/sign-up", signUpRequest);
    }
}