def test_create_and_get_tasks(client):
    # 登录获取 token
    login = client.post("/auth/login", json={
        "email": "test@example.com",
        "password": "test123"
    })
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 创建任务
    response = client.post("/tasks/", json={
        "title": "Test Task",
        "description": "This is a test",
        "status": "todo"
    }, headers=headers)
    assert response.status_code == 200
    task = response.json()
    assert task["title"] == "Test Task"

    # 查询任务
    response = client.get("/tasks/", headers=headers)
    assert response.status_code == 200
    tasks = response.json()
    assert any(t["title"] == "Test Task" for t in tasks)

