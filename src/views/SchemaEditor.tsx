import * as React from 'react';
import { Database } from "../schema";
import { ColumnInterface } from 'sql-ddl-to-json-schema/typings';
import "./base.css";

export interface SchemaEditorProps {
    database: Database;
}

export function SchemaEditor(props: SchemaEditorProps) {
    const styles = {
        tableBox: {
            border: '1px solid black',
            borderRadius: '3px',
            padding: '5px',
            width: '200px',
            margin: '10px'
        }
    };

    return (
        <div>
            {
                props.database.tables.map(table => {
                    return (
                        <div style={styles.tableBox}>
                            <h2 style={{ textAlign: 'center' }}>{table.name}</h2>

                            <table>
                                <tbody>
                                    {
                                        table.columns?.map(col => {
                                            return <ColumnRow key={col.name} column={col} />;
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    );
                })
            }
        </div>
    );
}

interface ColumnRowProps {
    column: ColumnInterface;
};

function ColumnRow(props: ColumnRowProps) {
    return (
        <tr>
            <td>{props.column.name}</td>
            <td>{props.column.type.datatype}</td>
            <td>{props.column.type.width ?? props.column.type.length}</td>
        </tr>
    );
}