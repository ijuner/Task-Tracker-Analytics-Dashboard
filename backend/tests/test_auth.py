
def test_register_and_login(client):
    # register user
    response = client.post("/auth/register", json={
        "email": "test@example.com",
        "password": "test123"
    })
    assert response.status_code == 200
    user = response.json()
    assert user["email"] == "test@example.com"

    # login user
    response = client.post("/auth/login", json={
        "email": "test@example.com",
        "password": "test123"
    })
    assert response.status_code == 200
    token = response.json()["access_token"]
    assert token
