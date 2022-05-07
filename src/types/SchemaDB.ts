/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Categories {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format bigint
   */
  id: number;

  /** @format timestamp with time zone */
  created_at?: string;

  /** @format text */
  title: string;

  /** @format text */
  description?: string;
}

export interface Product {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format bigint
   */
  id: number;

  /** @format text */
  title: string;

  /** @format bigint */
  price: number;

  /** @format text */
  image?: string;

  /** @format text */
  description: string;

  /** @format boolean */
  published: boolean;

  /** @format uuid */
  created_by?: string;

  /** @format timestamp with time zone */
  created_at?: string;
}

export interface Profile {
  /** @format timestamp with time zone */
  created_at?: string;

  /** @format text */
  first_name?: string;

  /** @format text */
  email: string;

  /** @format text */
  last_name?: string;

  /** @format text */
  phone_number?: string;

  /** @format text */
  city?: string;

  /** @format text */
  state?: string;

  /** @format text */
  country?: string;

  /** @format text */
  photo_url?: string;

  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format uuid
   */
  id: string;

  /** @format uuid */
  user_id: string;
}
