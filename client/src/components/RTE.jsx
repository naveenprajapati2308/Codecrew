import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from '../conf/config';



export default function RTE({ name, control, defaultValue = "", errors }) {
    return (
        <div>
            <Controller
                name={name || "content"}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                    <div>

                        <Editor
                            // apiKey={conf.tinyMceApiKey}
                            apiKey='xx25q38k5l9nsnjtri27bwba2boyruhu8y2hqlrjsiseacm7'

                            initialValue={defaultValue}
                            init={{
                                initialValue: defaultValue,
                                height: 500,
                                menubar: true,
                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    "anchor",
                                ],
                                toolbar:
                                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                            }}
                            onEditorChange={onChange}
                        />
                        {errors[name] && <h5 className="text-danger">Please Fill this!{errors[name].message}</h5>}
                    </div>
                )}
            />

        </div>
    )
}