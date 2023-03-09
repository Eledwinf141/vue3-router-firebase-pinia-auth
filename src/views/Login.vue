<template>
    <div style="position: relative;">
        <div class="login_Register">
            <h1 class="text-center">Iniciar Sesión</h1>
            <a-row>
                <a-col  :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
                    <a-form
                        name="basicLogin"
                        autocomplete="off"
                        layout="vertical"
                        :model="formState"
                        @finish="onFinish"
                        @finishFailed="onFinishFailed"
                    >
                        <a-form-item
                            name="email"
                            label="Ingrese tu correo electronico"
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
                            label="Ingrese su contraseña"
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
                        <a-form-item>
                            <a-space>
                            <a-button
                                type="primary"
                                html-type="submit"
                                :disabled="userStore.loadingUser"
                                :loading="userStore.loadingUser"
                                >Iniciar sesión</a-button
                                
                            >
                            <a-button
                                type="primary"
                                @click="router.push(`/register`)"
                                :disabled="userStore.loadingUser"
                                :loading="userStore.loadingUser"
                                >Registrarse</a-button
                                
                            >
                            </a-space>
                        </a-form-item>
                    </a-form>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import { message } from "ant-design-vue";
import {useRouter} from "vue-router"
const router = useRouter();

const userStore = useUserStore();

const formState = reactive({
    email: "user@test.com",
    password: "123456",
});

const onFinish = async (values) => {
    // console.log("Success:", values);
    const error = await userStore.loginUser(
        formState.email,
        formState.password
    );

    if (!error) {
        return message.success("Bienvenidos a la app hecha con vue3, pinia, antDesingVue y firebase");
    }

    switch (error) {
        case "auth/user-not-found":
            message.error("No existe el correo registrado!!");
            break;
        case "auth/wrong-password":
            message.error("Error con la contraseña!!");
            break;
        default:
            message.error(
                "Ocurrió un error en el servidor,por favor intentelo más tarde..."
            );
            break;
    }
};

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};
</script>