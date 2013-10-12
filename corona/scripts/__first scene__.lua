local storyboard = require("storyboard")
local scene = storyboard.newScene()

function scene:createScene(event)
  local group = self.view
end

scene:addEventListener("createScene", scene)
--scene:addEventListener("destroyScene", scene)
--scene:addEventListener("willEnterScene", scene)
--scene:addEventListener("enterScene", scene)
--scene:addEventListener("exitScene", scene)
--scene:addEventListener("didExitScene", scene)
--scene:addEventListener("overlayBegan", scene)
--scene:addEventListener("overlayEnded", scene)

return scene
