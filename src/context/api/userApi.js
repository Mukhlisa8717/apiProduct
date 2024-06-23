import { api } from "./index";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Post request
    createUser: build.mutation({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
