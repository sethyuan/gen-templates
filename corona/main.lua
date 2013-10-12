local storyboard = require("storyboard")

--storyboard.purgeOnSceneChange = true
storyboard.gotoScene("scripts.{{{first scene}}}")

-- Set a fits it all background image.
--local bg = display.newImageRect("bg.png", 900, 1425)
--bg:setReferencePoint(display.CenterReferencePoint)
--bg.x = display.contentCenterX
--bg.y = display.contentCenterY

-- Application events
--Runtime:addEventListener("system", function(event)
--  local eventType = event.type
--  if eventType == "applicationSuspend" then
--    onApplicationSuspend()
--  elseif eventType == "applicationResume" then
--    onApplicationResume()
--  elseif eventType == "applicationExit" then
--    onApplicationExit()
--  end
--  return true
--end)
--
--local function onApplicationSuspend()
--  print("app suspended")
--end
--
--local function onApplicationResume()
--  print("app resumed")
--end
--
--local function onApplicationExit()
--  print("app exit")
--end
