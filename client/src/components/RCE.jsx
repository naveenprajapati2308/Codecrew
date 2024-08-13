import React from 'react';
import { Controller } from 'react-hook-form';
import MonacoEditor from '@monaco-editor/react';

const RCE = ({ name, control, defaultValue = "", language = "javascript", theme = "vs-dark" , errors}) => {
    return (
        <Controller
            name={name}
            rules={{ required: true }}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, value } }) => (
                <div>
                    {errors[name] && <h5 className="text-danger">Please Fill this!{errors[name].message}</h5>}
                <MonacoEditor
                    height="60vh"
                    language={language}
                    theme={theme}
                    value={value}
                    onChange={onChange}
                    options={{
                        wordWrap: 'on',
                        minimap: { enabled: false }
                    }}
                />
                
                </div>
            )}
        />
    );
};

export default RCE;
