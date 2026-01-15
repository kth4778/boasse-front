import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import noticeApi from '../../api/noticeApi';
import { FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import './Notice.css';

const NoticeWrite = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    password: '',
  });
  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [removeFileIds, setRemoveFileIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const response = await noticeApi.getNoticeDetail(id);
        if (response.data.success) {
          const { title, content, attachments } = response.data.data;
          setFormData(prev => ({ ...prev, title, content }));
          if (attachments) {
            setExistingFiles(attachments);
          }
        }
      } catch (error) {
        console.error('Failed to fetch notice detail for edit:', error);
        // API call failed, no mock data fallback
        // Optionally alert the user or redirect
      }
    };

    if (isEdit) {
      fetchNoticeDetail();
    }
  }, [id, isEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    // 파일 선택 후 input 비우기 (같은 파일 다시 선택 가능하게)
    e.target.value = '';
  };

  const handleRemoveNewFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingFile = (fileId) => {
    setRemoveFileIds((prev) => [...prev, fileId]);
    setExistingFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.password) {
      alert('필수 항목(*)을 모두 입력해 주세요.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('password', formData.password);
    files.forEach((file) => data.append('files', file));
    
    if (removeFileIds.length > 0) {
      data.append('removeFileIds', removeFileIds.join(','));
    }

    setLoading(true);
    try {
      let response;
      if (isEdit) {
        response = await noticeApi.updateNotice(id, data);
      } else {
        response = await noticeApi.createNotice(data);
      }

      if (response.data.success) {
        alert(isEdit ? '수정되었습니다.' : '등록되었습니다.');
        navigate(isEdit ? `/notice/${id}` : '/notice');
      }
    } catch (error) {
      console.error('Failed to save notice:', error);
      alert('오류가 발생했습니다. 비밀번호를 확인하거나 잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notice-page">
      <section className="sub-header">
        <Container>
          <h2 className="sub-title-main">Notice</h2>
          <p className="sub-title-sub">{isEdit ? '공지사항 수정' : '공지사항 작성'}</p>
        </Container>
      </section>

      <Container className="notice-content py-5">
        <Form onSubmit={handleSubmit} className="notice-form">
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">제목 *</Form.Label>
            <Form.Control 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="제목을 입력하세요."
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">내용 *</Form.Label>
            <Form.Control 
              as="textarea" 
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={15} 
              placeholder="내용을 입력하세요."
              required
            />
          </Form.Group>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-bold">첨부파일</Form.Label>
                <Form.Control 
                  type="file" 
                  multiple 
                  onChange={handleFileChange}
                />
                <Form.Text className="text-muted">
                  여러 파일을 선택할 수 있습니다.
                </Form.Text>

                {/* 새로 선택한 파일 목록 표시 */}
                {files.length > 0 && (
                  <div className="mt-3">
                    <p className="fw-bold mb-2 small text-primary">새로 선택한 파일</p>
                    <ul className="list-unstyled">
                      {files.map((file, idx) => (
                        <li key={`new-${idx}`} className="d-flex align-items-center mb-2 p-2 border rounded bg-light">
                          <span className="text-truncate me-auto" style={{ maxWidth: '80%' }}>
                            {file.name}
                          </span>
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            className="ms-2 py-0 px-2"
                            onClick={() => handleRemoveNewFile(idx)}
                            title="삭제"
                          >
                            <FaTrash size={12} />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 기존 첨부파일 목록 표시 */}
                {isEdit && existingFiles.length > 0 && (
                  <div className="mt-3">
                    <p className="fw-bold mb-2 small text-secondary">기존 첨부파일 (수정 시 삭제 가능)</p>
                    <ul className="list-unstyled">
                      {existingFiles.map((file) => (
                        <li key={file.id} className="d-flex align-items-center mb-2 p-2 border rounded bg-light">
                          <span className="text-truncate me-auto" style={{ maxWidth: '80%' }}>
                            {file.originalName}
                          </span>
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            className="ms-2 py-0 px-2"
                            onClick={() => handleRemoveExistingFile(file.id)}
                            title="삭제"
                          >
                            <FaTrash size={12} />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-bold">관리자 비밀번호 *</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="수정/삭제 시 필요한 비밀번호입니다."
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-center mt-5 gap-3">
            <Button 
              variant="outline-secondary" 
              size="lg" 
              className="px-5"
              onClick={() => navigate(-1)}
            >
              <FaTimes className="me-1" /> 취소
            </Button>
            <Button 
              type="submit" 
              className="btn-primary-custom px-5" 
              size="lg"
              disabled={loading}
            >
              <FaSave className="me-1" /> {loading ? '저장 중...' : '저장하기'}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default NoticeWrite;