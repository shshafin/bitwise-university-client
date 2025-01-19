/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from "../../../types";
import {
  TAcademicFaculty,
  TAcademicSemester,
} from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all semesters with caching support
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
      providesTags: ["Semesters" as any], // Cache the result of this query
    }),

    // Add academic semester with cache invalidation
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Semesters" as any], // Invalidate "Semesters" tag when this mutation is called
    }),

    // Fetch all academic faculties with caching support
    getAcademicFaculty: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => ({
        data: response?.data,
        meta: response?.meta,
      }),
      providesTags: ["Faculty" as any], // Cache the result of this query
    }),

    // Add academic faculty with cache invalidation
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faculty" as any], // Invalidate "Faculty" tag when this mutation is called
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useGetAcademicFacultyQuery,
  useAddAcademicFacultyMutation,
} = academicManagementApi;
