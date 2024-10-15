import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormProps, Input, message } from 'antd';
import { TOKEN } from '@/shared/const/localstorage';
import { ILoginForm } from '@/entities/auth';
import { baseURL } from '@/shared/api/rtkApi';

export const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish: FormProps<ILoginForm>['onFinish'] = async (values) => {
        setIsLoading(true);
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await fetch(`${baseURL}auth/jwt/login`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Неправильная почта или пароль');
            }

            const data = await response.json();

            message.success('Добро пожаловать!');
            localStorage.setItem(TOKEN, String(data.access_token));
            navigate('/');
        } catch (error) {
            message.error('Вы ввели неправильную почту или пароль');
            form.resetFields(['username', 'password']);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <h1 className="text-center mb-5 text-2xl font-semibold">
                    Авторизация
                </h1>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    form={form}
                    style={{ width: '100%' }}
                    onFinishFailed={(errorInfo) =>
                        console.log('Failed:', errorInfo)
                    }
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item<ILoginForm>
                        label="Почта"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите вашу почту!',
                            },
                        ]}
                    >
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item<ILoginForm>
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите ваш пароль!',
                            },
                        ]}
                    >
                        <Input type="password" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            loading={isLoading}
                            block
                            type="primary"
                            htmlType="submit"
                        >
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
