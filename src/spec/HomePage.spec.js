import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import HomePage from "../pages/Homepage";
import mockData from "../../public/mockData/mock.json"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: () => ({ projectInfo: mockData }),
}));

describe("HomePage 컴포넌트", () => {
  it("rendering 테스트", () => {
    render(<HomePage />, { wrapper: HashRouter });
    expect(screen.getByText(/환영합니다/)).toBeInTheDocument();
  });

  it("채널방목록들이 화면에 렌더링 되어야 합니다.", () => {
    const { channels } = mockData;
    render(<HomePage />, { wrapper: HashRouter });

    channels.forEach((channel, index) => {
      const channelEl = screen.getByTestId(index);
      const hasChannelTitle = channelEl.textContent.includes(channel.title);

      expect(hasChannelTitle).toBeTruthy();
    });
  });

  it("채널방 엘리먼트는 해당 채널의id를 가진 url로 이동하는 링크입니다", () => {
    render(<HomePage />, { wrapper: HashRouter });
    const channelEl = screen.getByTestId(0);
    const channelId = mockData.channels[0]._id;

    const hasChannelId = channelEl.href.includes(channelId);

    expect(hasChannelId).toBeTruthy();
  });
});
