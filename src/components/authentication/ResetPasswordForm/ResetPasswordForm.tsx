"use client";

import React from "react";
import { AutoForm, ErrorsField, TextField } from "uniforms-antd";
import { bridge as schema } from "./ResetPasswordFormSchema";
import { Button, message } from "antd";
import styles from "./style.module.css";
import { resetPassword } from "@/services/authentication/AuthenticationService";

export function ResetPasswordForm({ token }: { token: string }) {
  const error = ({ response }: { response: { data: { message: string } } }) => {
    message.error(response.data.message);
  };

  function onSubmit(data: { password: string; repeatPassword: string }) {
    resetPassword({ token: token, password: data.password })
      .then((response) => {
        message.success("Password reset");
          if (typeof window !== "undefined") {
              window.location.href = "/auth/login";
          }
      })
      .catch(error);
  }

  return (
    <AutoForm schema={schema} onSubmit={onSubmit}>
      <TextField name="password" type="password" />
      <TextField name="repeatPassword" type="password" />
      <ErrorsField />
      <div>
        <Button
          className={styles.resetPasswordButton}
          type="primary"
          htmlType="submit"
        >
          Reset password
        </Button>
      </div>
    </AutoForm>
  );
}
