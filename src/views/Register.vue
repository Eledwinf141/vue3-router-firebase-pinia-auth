<template>
    <div class="login_Register">
        <h1 class="text-center">Registro</h1>
        <a-row>
            <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
                <a-form
                    name="basicRegister"
                    autocomplete="off"
                    layout="vertical"
                    :model="formState"
                    @finish="onFinish"
                >
                    <a-form-item
                        name="email"
                        label="Ingrese tu correo"
                        :rules="[
                            {
                                required: true,
                                whitespace: true,
                                type: 'email',
                                message: 'Ingresa un email válido',
                            },
                        ]"
                    >
                        <a-input v-model:value="formState.email"></a-input>
                    </a-form-item>
                    <a-form-item
                        name="password"
                        label="Ingrese contraseña"
                        :rules="[
                            {
                                required: true,
                                min: 6,
                                whitespace: true,
                                message:
                                    'Ingresa una contraseña con mínimo 6 carácteres',
                            },
                        ]"
                    >
                        <a-input-password
                            v-model:value="formState.password"
                        ></a-input-password>
                    </a-form-item>
                    <a-form-item
                        name="repassword"
                        label="Repita contraseña"
                        :rules="[
                            {
                                validator: validatePass,
                            },
                        ]"
                    >
                        <a-input-password
                            v-model:value="formState.repassword"
                        ></a-input-password>
                    </a-form-item>
                    <a-form-item>
                        <a-space>
                        <a-button
                            type="primary"
                            html-type="submit"
                            :disabled="userStore.loadingUser"
                            :loading="userStore.loadingUser"
                            >Registrate</a-button
                        >
                        <a-button
                            type="primary"
                           @click ="$router.push(`/login`)"
                            :disabled="userStore.loadingUser"
                            :loading="userStore.loadingUser"
                            >Volver al login</a-button
                        >
                    </a-space>
                    </a-form-item>
                </a-form>
            </a-col>
        </a-row>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import { message } from "ant-design-vue";

const userStore = useUserStore();

const formState = reactive({
    email: "user@test.com",
    password: "123456",
    repassword: "123456",
});

const validatePass = async (_rule, value) => {
    if (value === "") {
        return Promise.reject("Repita contraseña");
    }
    if (value !== formState.password) {
        return Promise.reject("No coinciden las contraseñas");
    }
    return Promise.resolve();
};

const onFinish = async (values) => {
    console.log("Success:", values);
    const error = await userStore.registerUser(
        formState.email,
        formState.password
    );
    if (!error) {
        return message.success("Revisa tu correo electrónico y verificalo");
    }

    switch (error) {
        case "auth/email-already-in-use":
            message.error("Email ya se encuentra registrado");
            break;
        default:
            message.error(
                "Ocurrió un error en el servidor, intentelo más tarde..."
            );
            break;
    }
};
</script>