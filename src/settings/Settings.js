import { Form } from 'react-bootstrap';

export default function Setting({audioVolume: {musicVolume, soundVolume}, setSoundsVolume}) {

  return (
    <Form>
      <Form.Group controlId="formBasicRange">
        <Form.Label>Music volume</Form.Label>
        <Form.Control name='musicVolume' min="0" max="1" step="0.1" value={musicVolume} onChange={(e) => setSoundsVolume(e.target.name, e.target.value, )} type="range" />
        <Form.Check type="checkbox" label="Music ON/OFF" name='musicVolume' checked={musicVolume ? true : false} onChange={(e) => setSoundsVolume(e.target.name, e.target.checked ? 0.75 : 0 )}/>
      </Form.Group>

      <Form.Group controlId="formBasicRange">
        <Form.Label>Sounds volume</Form.Label>
        <Form.Control name='soundVolume' min="0" max="1" step="0.1" value={soundVolume} onChange={(e) => setSoundsVolume(e.target.name, e.target.value, )} type="range" />
        <Form.Check type="checkbox" label="Sounds ON/OFF" name='soundVolume' checked={soundVolume ? true : false} onChange={(e) => setSoundsVolume(e.target.name, e.target.checked ? 0.75 : 0 )}/>
      </Form.Group>
    </Form>
  );
}