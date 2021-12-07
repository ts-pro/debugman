import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div>
      <Link to="/websocket">Websocket</Link>
      <Link to="/grpc">Grpc</Link>
    </div>
  );
}
