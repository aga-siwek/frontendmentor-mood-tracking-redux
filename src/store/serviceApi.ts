import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type RootState } from "./store";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Mood"], // "Metka" dla danych, żeby wiedzieć kiedy je odświeżyć
  endpoints: (builder) => ({
    // Logowanie (zwróci token)
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials, // Tu leci email i hasło
      }),
    }),
    // Pobieranie nastrojów/todo
    getMoods: builder.query<any[], void>({
      query: () => "/moods",
      providesTags: ["Mood"],
    }),
    // Dodawanie
    addMood: builder.mutation({
      query: (newMood) => ({
        url: "/moods",
        method: "POST",
        body: newMood,
      }),
      invalidatesTags: ["Mood"], // "Zmuś" aplikację do pobrania nowej listy
    }),
  }),
});

export const { useLoginUserMutation, useGetMoodsQuery, useAddMoodMutation } =
  serviceApi;
