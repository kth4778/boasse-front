import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';
import logo from '../../assets/logo.png'; // 로고 경로 확인 필요

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authApi.login(password);
      if (response.data.success) {
        const { accessToken } = response.data.data;
        // 토큰 저장
        localStorage.setItem('accessToken', accessToken);
        // 대시보드로 이동
        navigate('/admin');
      } else {
        setError('로그인에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError('비밀번호가 올바르지 않습니다.');
      } else {
        setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Card style={{ width: '400px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <img src={logo} alt="BOAS Logo" style={{ height: '40px', marginBottom: '20px' }} />
            <h4 className="fw-bold">관리자 로그인</h4>
            <p className="text-muted small">안전한 접근을 위해 비밀번호를 입력해주세요.</p>
          </div>

          {error && <Alert variant="danger" className="py-2 text-center small">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ height: '50px' }}
                autoFocus
              />
            </Form.Group>

            <Button 
              variant="success" 
              type="submit" 
              className="w-100 fw-bold" 
              style={{ height: '50px', backgroundColor: '#8CC63F', border: 'none' }}
              disabled={loading}
            >
              {loading ? '인증 중...' : '로그인'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminLogin;
