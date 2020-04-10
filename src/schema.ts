import { TableInterface } from "sql-ddl-to-json-schema/typings";

export interface Database {
    name: string;
    tables: TableInterface[];
}