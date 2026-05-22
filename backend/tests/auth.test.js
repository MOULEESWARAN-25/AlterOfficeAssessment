const assert = require("assert");
const { verifyToken } = require("../Middleware/AuthMiddleware");
const jwt = require("jsonwebtoken");

console.log("Running AuthMiddleware unit tests...");

// Test Case 1: No token provided
{
  const req = { headers: {} };
  let statusVal = null;
  let jsonVal = null;
  const res = {
    status(code) {
      statusVal = code;
      return {
        json(val) {
          jsonVal = val;
        }
      };
    }
  };
  let nextCalled = false;
  const next = () => { nextCalled = true; };

  verifyToken(req, res, next);
  assert.strictEqual(statusVal, 403);
  assert.deepStrictEqual(jsonVal, { error: "No token provided" });
  assert.strictEqual(nextCalled, false);
  console.log("✓ Test Case 1 passed: No token provided returned 403");
}

// Test Case 2: Malformed token
{
  const req = { headers: { authorization: "Bearer" } };
  let statusVal = null;
  let jsonVal = null;
  const res = {
    status(code) {
      statusVal = code;
      return {
        json(val) {
          jsonVal = val;
        }
      };
    }
  };
  let nextCalled = false;
  const next = () => { nextCalled = true; };

  verifyToken(req, res, next);
  assert.strictEqual(statusVal, 403);
  assert.deepStrictEqual(jsonVal, { error: "Malformed token" });
  assert.strictEqual(nextCalled, false);
  console.log("✓ Test Case 2 passed: Malformed token returned 403");
}

// Test Case 3: Invalid token
{
  const req = { headers: { authorization: "Bearer invalid_token" } };
  let statusVal = null;
  let jsonVal = null;
  const res = {
    status(code) {
      statusVal = code;
      return {
        json(val) {
          jsonVal = val;
        }
      };
    }
  };
  let nextCalled = false;
  const next = () => { nextCalled = true; };

  verifyToken(req, res, next);
  setTimeout(() => {
    assert.strictEqual(statusVal, 401);
    assert.deepStrictEqual(jsonVal, { error: "Unauthorized" });
    assert.strictEqual(nextCalled, false);
    console.log("✓ Test Case 3 passed: Invalid token returned 401");
  }, 50);
}

// Test Case 4: Valid token
{
  const user = { id: 1, name: "Test User", email: "test@example.com" };
  const token = jwt.sign(user, "alteroffice");
  const req = { headers: { authorization: `Bearer ${token}` } };
  let statusVal = null;
  let jsonVal = null;
  const res = {
    status(code) {
      statusVal = code;
      return {
        json(val) {
          jsonVal = val;
        }
      };
    }
  };
  let nextCalled = false;
  const next = () => { nextCalled = true; };

  verifyToken(req, res, next);
  setTimeout(() => {
    assert.strictEqual(statusVal, null);
    assert.strictEqual(nextCalled, true);
    assert.deepStrictEqual(req.user.name, user.name);
    console.log("✓ Test Case 4 passed: Valid token successfully verified and next() called");
    console.log("All AuthMiddleware unit tests completed successfully!");
  }, 100);
}
