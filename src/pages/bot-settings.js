import { useState } from "react";
import AlertMessage from "../dashboard/components/AlertMessage";

const BotSettings = () => {
  const [nickname, setNickname] = useState();

  return (
    <>
      <AlertMessage message="Any actions done on this page will not take effect yet, this page is still a WIP" />
      <div className="page-title">
        <h4>Bot Settings</h4>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="nickname">
          Bot nickname
        </label>
        <input
          disabled
          className="form-input"
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <div>
        <h1 className="danger-zone-title">Danger zone</h1>
        <div className="grid">
          <button disabled className="btn btn-red">Restart bot</button>
          <button disabled className="btn btn-red">Reload all commands</button>
          <button disabled className="btn btn-red">Shutdown</button>
        </div>
      </div>
    </>
  );
};

export default BotSettings;
