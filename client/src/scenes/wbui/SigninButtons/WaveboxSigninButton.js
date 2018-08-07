import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

const WAVEBOX_LOGO =
	'data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAklEQVR4AewaftIAAA9wSURBVOXBbZBddX3A8e/v9z/n3mST3TyRhISEJISHGAIBBBXM3qfNTPuydaxtZ6CaKtaqLcqoQUzugVanr8zqJBmLkBijklCoFQQKxTpax+nsmZbyoJ1pbmacvum0dc9hsvdSc07OnlNepB0mErLZ7G/33rufD/PZHU/tee/tz+4dZh5zzFPveuoByr475NSrF8Xk0VOv/jvzkTJP+Tq5Q0V3KjTWvX94mHlKmYe2/ORDOOc1AQHEL5eCG47vZT5S5qFlp67c4UR3cpaqjgwNecPMQ8o8s/XRvZQ8rwkIb+IpwaZjH2W+UeaZZUt0hyI7OYeijbWDl1eYZ5R5ZO3xT+KcNAHh14mnrrn9rz/FfKLMI1ctW77D4XZyHqraWLxg8TDziDJPXP/w3bhJ1wSE8xNP/eCmHz/AfKHME0tWr92hqju5ABUdWfT6mQrzhDIPXPbYA/ieNgFhCjwtNTc89sfMB8o8cN3g5A5V3ckUKdpYt3BlhXnA0eduf/7P8Qo5pCKbmToRpxsGNlx2dPwn/0o/U/qcpKd3ONURLpIijaW3b6nQ55Q+tvWf9uD7pQAQpqHk/OCdo/fQz5Q+NvQf+Q5FR5gmFamXr1tUoY8pfeq25+5jgV8OAGH6xC/KwYrfupV+pfQpP3HDIjrCJVKn9es+/psV+pTSh7Z8+4N4frkJCJdO/MwPrn/hc/QjpQ8tX7Fh2KmMMENUtbEsWVihDyl9Zv2zH6VUeE1AmEFONFj5tTvpN0qfWV9cPiwqI8wwdVq/bv3mCn1G6SNrntyDr64JCDNPnHPBNV/9Q/qJ0kc2qw6r6AhGVKS+6pp1FfqI0ifeefwTOM81AcGOeLjgticepF8ofaK8cOmwio5gTFUbpXJWoU8ofWDzE5/E9/0mIMwCz3nBe47upR8ofWDNwKphVTfCLFHVur9cqvQBpccNP/8gTosmIMweUec1t774fnqd0uOyyclhRUeYZSrSWPaf76jS45Qetmn0Tkp4ASDMAU+84JaffphepvSwNVdvGFaVBnNERWvl11ZX6WFKj1r/cIWSXw4AYe5IySsHy7+/g16l9Kj1a2vDgjSYY4rWt8hIlR6l9KDtf9PEd14ACF3AdxLc+Ng99CKlBy32ZViRBl1CxdWXDC2r0oOUHrPm2D14ngaA0EUUCVYf302vUXrMVYNLKoo26DIqWrt2SblKj1F6yPYffArP85qA0H1ECxds+tof0UuUHrLozOKKIg26lKrW1lyxukoPUXrELU9/Hh+/CQjdSzxPgxsP30uvUHrEgGhFRUfock5dffHyRVV6hNIDNj5+L86VmvQIv1wK3vXEbnqB0gPWlhZXFG3QI1So+QtLNXqA0uXesft38cteExB6h/jqNzfu2UW3U7rcssqWiiINeoyI1Nfdsb5Kl1O62PZ9v4+v2gSEHuQKDW78h110M6WLDWy9qqKiDXqUOlcbeG1VjS6mdKnLfvs2SnkpAITeJeXyouaa0TvpVkqXuvZjv1FR1To9TpH6VVdvrtGllC609elP4+d+AAiG8tdS8jjFmue5YNvffZFupHSh5W6ooqINjCVjMUkYY01FakuTrEYXUrrM2ifvwhUaYCyPU7JWm+xEmzxOseY8CW4+dh/dRukym92miqrWMZaEMeRAAclYjDUVrS5eUqrRZZQucvXoH6DOCwDBUB6nZK0O/ydrtcnjFGOiuGD7c7voJkoXWX3d1RUVqWMsCWPIC/5fAclYjDVVrS0+s6ZGF1G6xPVH/gSvKAJAMJTHKVmrzbmyVps8TrHmvFJwzZffJ3QJpUssXbm0ok4bGEvCGHJ+XQHJWIw1J6628trrq3QJpQvc/lwTT70AY3mckrU6nE/WapPHKdZ85wXvef5+uoHSBbxCqypax1gSxpAXnFcByViMNVWt6hmt0wWUObZxzy5UtAkIhvI4JWu1uZCs1SaPUoxJySs3Nzz8AHNNmWNr77iyqkgDY0kYQ86FFZCEMdYEauvX5TXmmDKHbvjqh/HFNTGWxylZq81UZa02eZxizeUabPvh3cwlZQ4t3ry6qiJ1jCVhDDlTV0AyFmNNnasNnV5VZw4pc2TFM3dQcuUAEAzlcUrWanOxslabPEqx5mu5ue5rH2SuKHPkumJnVUVrGEvCGHIuXgFJGGNNkdqV69fXmSPKHLjp2c/hO20CgqE8TslabaYra7XJoxRrvis1tz95vzAHlDkwqAurKq6BsSSMIWf6CkjCGGsqUhtyfo05oMyy9Y9/AldogLE8TslOtLlUWatNHqVYU6fBTU/fz2xTZtmGRcuqIlrDWBLGUHDpCkjCCGsqWl1ceHVmmTKLbvz6n+LEDwDBUB6nZCfazJSs1SGPUqw53wtu/sePCLNImUWDa5dWVbSGsSSMoWDmFJCEEdYUqS7879U1ZpEyS279xsfxRANAMJTHKdmJNjMta3XIoxRrfrkcbPqzO4VZosyS0vLLqupcHWNJGEPBzCsgCWOsKVK94rbNNWaJMgtue/w+/JIfYCyPU7ITbaxkrTZ5lGLNiQa3PrWH2aDMgvLiBTUVahhLwhgK7BSQhBHWFK2WPKkzCxRjV/70A3iiTUAwlMcp2Yk21rJWhzxKsVYSP3jHk58TjCnGrjy1tSZIHWNJGEOBvQKSMMKaiFQvc4tqGFMM3fDDXTiRJsbyOCU70Wa2ZK0OeZRiTb0i2Pb4HsGQYmhRvrqmonWMJWEMBbOngCSMsKa46tCAq2FIMXLFFz9EORtoYiyPU7ITbWZb1uqQRynWfNHg2qfvwopiZOMNG2qK1DGWhDEUzL4CkjDCmqpWV3qbGhhRDNzwtwFeWZsYy+OU7ESbuZK1OuRRijUv95p3/P19ggHFwNIzRU3ROsaSMIaCuVNAEkZYU5Wq+5VXx4Ayw6765m7UdwHG8jglO9FmrmWtDnmUYk09v7n9e/cz05QZtnZFqaaiVYwlYQwFc6+AJIywpmh1sFxuMMOUGXTjC7twnhcAgqE8TslOtOkWWatDHiVYc0jzhsfuFmaQMoMGX7+8pmgNY8lYDAXdo4AkjLGmItXFSzbWmUHKDLkmfJ94C8oBxvI4JWu16TZZq0MepVgrFZPBlT+8U5ghygxZ+V/bqoqrYSwZi6Gg+xSQhBHWVKRy5emr68wQZQa8+0efxXcuwFgepWStNt0qa3XIowRrTiW49dndzARlBrhOua6qNYwlYQwF3auAJIyxpmjFz7wGM0C5RNuO3k/JKzcxlkcpWatNt8taHfIoxVrZLwfXHmsKl0i5RMsuK9UEahhLwhgKul8BSRhhTUQqqwfzOpdIuQRbfvwRFAKM5VFK1mrTK7JWhzxKsKbOD7Z/90HhEiiXYHl7bV3V1TCWhDEU9I4CkrEYaypaGZDJOpdAmaZ1P70L33lNjOVRStZq02uykx3yKMFaaYEXXH/sC8I0KdO04dTGuorUMJaEMRSYKJQYJxEWCkjGYqypSGVoqKgzTco07PjuHvHEa2Isj1KyVhsrRUlGJ/1iH0aykx3yKMFaScrBzS/cI0yDMh0LtaaiNYwlYQwFNhxRsiTbny/hAE7GsVBAMhZjTVUrA5NL60yDcpFuefKzOPGaGMujlKzVxkpRlq/8/Mh3Tr185OhEXmYUI9nJDnmUYM3DBbc88XkulnKRBtzCuiI1jCVhDAU2nETFMrefs4ql7gBOxrFQQDIWY02RyqIBf4SLpFyEm3/0UXGeF2Asj1KyVhszZfnKi48cPsVZ/3Lo8ERRllGMZCc75FGCNc21ufV7XxAugnIRFrZX1RSpYiwJYyiw4SQ6PZju5xynh/QATsaxUEAyFmNNPVdZ6vkNLoIyRRu+eLf4finAWB6lZK02VibL+ejPjjx6inP8/BuHJyb9YhQj2ckOeZRgzfe0ufGZ3xOmSJmi9besqSlSxVgSxlBgonBEsmLgAOdRDOqBQhnHQgHJWIw1RSpXcE2DKVKm4N1PPYgTDTCWRylZq42VosToi19/6BTn8dLRIxMs0H0YyU52yMcTrHnqB7c89wBToUyB5xV1FVfFWBJGUGDDEaWlMwe4gNTvHMQxjoUCkjDGmooMLzxzZoQpUC5gy9P3iq8aYCyPUrJWBytFSUd/dvzYKS7g1eNPTFCSfRjJTnbIxxOs+V45ePfznxEuQLmAFQzWBKliLAkjKDBRKBErvQNMUbLEHcTJOBYKSMIYayIy7J9Z1OAClLex7fG94jkNMJZHKVmrg5kFOvrPDz1yiil69RuHJ1ig+zCSneyQjydYc54GW5/5tPA2lLcxNKA1Fa1iLAkjKLDhJDqzKN/PRcqG3EGcjGOhgCSMsabo8FIdbPA2lPO46vjH8FUDjOVRStbqYCX3i9FXjh6d4CK9dPiRibzEPoxkJzvk4wnWfFxw/fc+I5yHch6XD65qqGgVY0kYQYENJTqzKtvPNL1ezg7iZBwLBSRhjDUVHV5aWtjgPJS38N4X/kJ85zUxlkcJWauDlbzM6KsPPTrBNP3bse9MTJbYh5HsZId8PMGahxdsO7RbeAvKW5AkqStSxVgSxlBgwxGdGSj2c4mKIQ7iGMdCAUkYY01Vh5dcXmrwFpRz3PzkbpyTJsbyKCVrdbCSl2T01W9/a4JL9NKRb07kJd2Hkexkh3w8wZrv/ODm55qcSznHogULGipaxVgSRlBgw0nEMtnPTFnmHcQxjoUCkjDGmiDDi07nI5xDeZMbf/AxcblrYiyPErJWBytFWUZfPHRkghny4qFHJoqy7sNIdrJDPp5gzZX94JoD9wpvorzJojNr6ipSxVgSxlBgw0mULXX7mWHJyskDOBnHQgFJGGNNRYdXbh5s8CbKWRu+fJeUoImxPErJWh2sTHr56MuHDk0ww372l99qT5aLfRjJTnbIxxOs+aLB1kfvE85Szlq/ZWNdRasYS8IICkwUTqJ8uezHyOSgHkAZx0IBSRhjTdHh5UtKDc5S3nDbc3tw6gKM5VFC1upgpSix7+XDRycw8sqRI+1ige7DSHayw+R4gjXnvOC9398rvEF5gzudN1RcBWNJGEOBDUd0upwewNj/DGUHcIxjoYA0jLGmyDBucoQ3uOFn9kqpVD4iyAYM5VFC8qNfYmahfOnlv/r2DzA2/tIr6ZptNznJ2ImB/LUUf/NiZMDDkuA2Xf6B6hEtcq0LUsFYMhZDgQ0n4+my0gFmyZmV3kGc/BILBSRhjDUVHfZcMeI5X3cDpzGUx6lmv3jdwwkmFuroK488PMEseeWhQ+1bf2fXPn6VfwkD2S9eJ4/STFeUcgx56u3+Xyr0QwnzvbRpAAAAAElFTkSuQmCC'

const styles = {
	root: {
		display: 'flex',
		alignItems: 'center',
		height: 46,
		margin: 6,
		cursor: 'pointer',
		borderRadius: 1,
		boxShadow: '0px 1px 3px 0px #A6A6A6',
		backgroundColor: '#00B5F3',
		color: '#FFFFFF',

		'&:hover, &:focus': {
			boxShadow: '0px 3px 3px 0px #A6A6A6'
		},

		'&:active': {
			backgroundColor: '#008fc0'
		}
	},
	logo: {
		height: 'calc(100% - 4px)',
		width: 'auto',
		paddingTop: 8,
		paddingBottom: 8,
		marginLeft: 2,
		borderRadius: 2
	},
	text: {
		display: 'inline-block',
		width: '100%',
		textAlign: 'center',
		fontSize: 14,
		paddingLeft: 12,
		paddingRight: 12
	}
}

@withStyles(styles)
class WaveboxSigninButton extends React.Component {
	/* **************************************************************************/
	// Rendering
	/* **************************************************************************/

	render() {
		const { className, classes, ...passProps } = this.props
		return (
			<div className={classNames(classes.root, className)} {...passProps}>
				<img src={WAVEBOX_LOGO} className={classes.logo} />
				<span className={classes.text}>Sign in with Wavebox</span>
			</div>
		)
	}
}

export default WaveboxSigninButton
