const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
	if (req.user) {
		console.log("requested user :",req.user._json.email)
		return res.status(200).json({
			error: false,
			message: "Successfully Logged In",
			user: req.user,
		});
	} else {
		return res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	return res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect:'http://sparkzccet.tech/register',
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect('https://sparkzccet.tech/');
});

module.exports = router;
