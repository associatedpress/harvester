function render(req, res, opts = {}) {
  const {
    view,
    status = 200,
    ...options
  } = opts

  const { formType, formId } = req.harvesterResource || {}
  const logo = req.harvesterLogo
  const version = req.harvesterVersion
  const user = req.auth && { email: req.auth.email }

  const props = {
    version,
    formType,
    formId,
    logo,
    user,
    status,
    ...options,
  }

  return res.status(status).render(view, { props })
}

module.exports = render
