import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import noticeApi from '../../../api/noticeApi';

/*
 * [관리자 공지사항 작성/수정 컴포넌트]
 * 공지사항의 제목, 내용, 작성자를 입력하고 첨부파일을 관리합니다.
 * 사용자 페이지의 NoticeWrite와 유사하나 관리자 레이아웃에 맞춰져 있습니다.
 */
const AdminNoticeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '관리자',
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
          const { title, content, author, attachments } = response.data.data;
          setFormData(prev => ({ ...prev, title, content, author }));
          if (attachments) {
            setExistingFiles(attachments);
          }
        }
      } catch (error) {
        console.error('공지사항 상세 정보 불러오기 실패:', error);
        if (error.code === 'ERR_NETWORK') {
          alert('서버와 연결할 수 없습니다. 관리자에게 문의하세요.');
        } else {
          alert('데이터를 불러오는 중 오류가 발생했습니다.');
        }
        navigate('/admin/notice');
      }
    };

    if (isEdit) {
      fetchNoticeDetail();
    }
  }, [id, isEdit, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
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
    if (!formData.title || !formData.content) {
      alert('필수 항목(*)을 모두 입력해 주세요.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('author', formData.author);
    
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
        navigate('/admin/notice');
      }
    } catch (error) {
      console.error('공지사항 저장 실패:', error);
      if (error.code === 'ERR_NETWORK') {
        alert('서버와 연결할 수 없습니다. 백엔드 서버가 켜져 있는지 확인해주세요.');
      } else {
        alert('저장 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-card">
      <h4 className="fw-bold mb-4">{isEdit ? '공지사항 수정' : '새 공지사항 작성'}</h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={9}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">제목 *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="공지사항 제목을 입력하세요."
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">작성자</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">내용 *</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={12}
            placeholder="공지사항 내용을 입력하세요. (HTML 가능)"
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">첨부파일</Form.Label>
              <Form.Control type="file" multiple onChange={handleFileChange} />
              
              {/* 파일 목록 */}
              {(files.length > 0 || existingFiles.length > 0) && (
                <div className="mt-3 p-3 bg-light rounded">
                  {existingFiles.length > 0 && (
                    <div className="mb-2">
                      <small className="text-muted d-block mb-1">기존 파일:</small>
                      {existingFiles.map(file => (
                        <div key={file.id} className="d-flex align-items-center mb-1">
                          <span className="text-truncate small flex-grow-1">{file.originalName}</span>
                          <Button variant="link" className="text-danger p-0 ms-2" onClick={() => handleRemoveExistingFile(file.id)}>
                            <FaTrash size={12} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  {files.map((file, idx) => (
                    <div key={idx} className="d-flex align-items-center mb-1">
                      <span className="text-truncate small flex-grow-1 text-primary">{file.name} (새 파일)</span>
                      <Button variant="link" className="text-danger p-0 ms-2" onClick={() => handleRemoveNewFile(idx)}>
                        <FaTrash size={12} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-4 gap-2">
          <Button variant="outline-secondary" onClick={() => navigate('/admin/notice')}>
            <FaTimes className="me-1" /> 취소
          </Button>
          <Button type="submit" variant="success" disabled={loading}>
            <FaSave className="me-1" /> {loading ? '저장 중...' : '저장하기'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminNoticeForm;
