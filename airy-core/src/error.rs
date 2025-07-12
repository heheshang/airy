use thiserror::Error;

#[derive(Error, Debug)]
pub enum Error {
    #[error("no error")]
    NoError,
    #[error("unexpected request body")]
    RequestBodyMustBeRaw,
    #[error("missing `{0}` header")]
    MissingHeader(&'static str),
}

pub type Result<T> = std::result::Result<T, Error>;

impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

